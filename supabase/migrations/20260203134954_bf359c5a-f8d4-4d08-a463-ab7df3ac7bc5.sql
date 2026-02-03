-- Create enum for problem categories
CREATE TYPE public.problem_category AS ENUM ('ai_engineering', 'data_science', 'software_engineering');

-- Create enum for difficulty levels
CREATE TYPE public.problem_difficulty AS ENUM ('easy', 'medium', 'hard');

-- Create enum for submission status
CREATE TYPE public.submission_status AS ENUM ('accepted', 'wrong_answer', 'runtime_error', 'time_limit_exceeded', 'pending');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create problems table
CREATE TABLE public.problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category public.problem_category NOT NULL,
  difficulty public.problem_difficulty NOT NULL,
  instructions TEXT NOT NULL,
  starter_code TEXT NOT NULL DEFAULT '# Write your solution here\n\nimport pandas as pd\nimport numpy as np\n\ndef solution(data):\n    # Your code here\n    pass',
  dataset_url TEXT,
  evaluation_metric TEXT NOT NULL,
  target_threshold DECIMAL,
  test_cases JSONB,
  is_daily BOOLEAN DEFAULT false,
  daily_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create submissions table
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
  code TEXT NOT NULL,
  status public.submission_status NOT NULL DEFAULT 'pending',
  score DECIMAL,
  runtime_ms INTEGER,
  memory_kb INTEGER,
  output TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create streaks table
CREATE TABLE public.streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_submission_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_problem_progress table to track solved problems
CREATE TABLE public.user_problem_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  problem_id UUID REFERENCES public.problems(id) ON DELETE CASCADE NOT NULL,
  solved BOOLEAN DEFAULT false,
  best_score DECIMAL,
  attempts INTEGER DEFAULT 0,
  first_solved_at TIMESTAMP WITH TIME ZONE,
  last_attempted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, problem_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_problem_progress ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Problems policies (public read, admin write - for now everyone can read)
CREATE POLICY "Anyone can view problems" ON public.problems
  FOR SELECT USING (true);

-- Submissions policies
CREATE POLICY "Users can view own submissions" ON public.submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own submissions" ON public.submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Streaks policies
CREATE POLICY "Users can view own streaks" ON public.streaks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own streaks" ON public.streaks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streak" ON public.streaks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User problem progress policies
CREATE POLICY "Users can view own progress" ON public.user_problem_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON public.user_problem_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON public.user_problem_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  INSERT INTO public.streaks (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add timestamp triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_problems_updated_at
  BEFORE UPDATE ON public.problems
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_streaks_updated_at
  BEFORE UPDATE ON public.streaks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample problems
INSERT INTO public.problems (title, slug, description, category, difficulty, instructions, evaluation_metric, target_threshold, starter_code) VALUES
(
  'Predict House Prices',
  'predict-house-prices',
  'Given a dataset of house features including square footage, number of bedrooms, bathrooms, and location data, build a regression model to predict house prices. Your model will be evaluated on its ability to minimize the Root Mean Square Error (RMSE) on a hidden test set.',
  'data_science',
  'medium',
  '## Task\nBuild a regression model to predict house prices based on the provided features.\n\n## Dataset\nThe training data contains:\n- **sqft**: Square footage of the house\n- **bedrooms**: Number of bedrooms\n- **bathrooms**: Number of bathrooms\n- **age**: Age of the house in years\n- **location_score**: A numerical score representing location desirability\n- **price**: Target variable (house price in thousands)\n\n## Requirements\n1. Load and explore the data\n2. Preprocess features as needed\n3. Train a regression model\n4. Return predictions for the test set\n\n## Evaluation\nYour solution will be scored using RMSE. Target: RMSE < 50',
  'rmse',
  50,
  '# House Price Prediction\nimport pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error\n\ndef solution(train_data, test_data):\n    """\n    Build a model to predict house prices.\n    \n    Args:\n        train_data: DataFrame with features and target ''price''\n        test_data: DataFrame with features only\n    \n    Returns:\n        predictions: numpy array of predicted prices\n    """\n    # Your code here\n    X_train = train_data.drop(''price'', axis=1)\n    y_train = train_data[''price'']\n    \n    # TODO: Build and train your model\n    model = LinearRegression()\n    model.fit(X_train, y_train)\n    \n    predictions = model.predict(test_data)\n    return predictions'
),
(
  'Customer Churn Classification',
  'customer-churn-classification',
  'Predict whether a customer will churn (leave the service) based on their usage patterns and demographics. This is a binary classification problem where you need to achieve high accuracy on the test set.',
  'data_science',
  'easy',
  '## Task\nClassify customers as churned (1) or retained (0) based on their features.\n\n## Dataset\nFeatures include:\n- **tenure**: Months as customer\n- **monthly_charges**: Monthly bill amount\n- **total_charges**: Total amount billed\n- **contract_type**: Month-to-month, One year, Two year\n- **payment_method**: Electronic check, Mailed check, etc.\n\n## Requirements\n1. Handle any missing values\n2. Encode categorical variables\n3. Train a classification model\n4. Return probability predictions\n\n## Evaluation\nYour solution will be scored using F1 Score. Target: F1 > 0.75',
  'f1_score',
  0.75,
  '# Customer Churn Classification\nimport pandas as pd\nimport numpy as np\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.preprocessing import LabelEncoder\n\ndef solution(train_data, test_data):\n    """\n    Classify customers as churned or retained.\n    \n    Args:\n        train_data: DataFrame with features and target ''churn''\n        test_data: DataFrame with features only\n    \n    Returns:\n        predictions: numpy array of predicted labels (0 or 1)\n    """\n    # Your code here\n    pass'
),
(
  'Build a RAG Pipeline',
  'build-rag-pipeline',
  'Implement a Retrieval-Augmented Generation (RAG) pipeline that can answer questions about a given document corpus. You''ll need to implement document chunking, embedding generation, and retrieval logic.',
  'ai_engineering',
  'hard',
  '## Task\nBuild a complete RAG pipeline for question answering.\n\n## Components\n1. **Document Chunking**: Split documents into meaningful chunks\n2. **Embedding Generation**: Create embeddings for each chunk\n3. **Retrieval**: Find relevant chunks for a query\n4. **Answer Generation**: Use retrieved context to answer\n\n## Requirements\n- Implement overlap in chunking\n- Use cosine similarity for retrieval\n- Return top-k most relevant chunks\n\n## Evaluation\nEvaluated on retrieval accuracy (Recall@5)',
  'recall_at_5',
  0.80,
  '# RAG Pipeline Implementation\nimport numpy as np\nfrom typing import List, Tuple\n\nclass RAGPipeline:\n    def __init__(self, chunk_size: int = 500, overlap: int = 50):\n        self.chunk_size = chunk_size\n        self.overlap = overlap\n        self.chunks = []\n        self.embeddings = []\n    \n    def chunk_documents(self, documents: List[str]) -> List[str]:\n        """\n        Split documents into overlapping chunks.\n        \n        Args:\n            documents: List of document strings\n        \n        Returns:\n            List of text chunks\n        """\n        # TODO: Implement chunking\n        pass\n    \n    def generate_embeddings(self, texts: List[str]) -> np.ndarray:\n        """\n        Generate embeddings for text chunks.\n        \n        Args:\n            texts: List of text strings\n        \n        Returns:\n            numpy array of embeddings\n        """\n        # TODO: Implement embedding generation\n        pass\n    \n    def retrieve(self, query: str, k: int = 5) -> List[Tuple[str, float]]:\n        """\n        Retrieve top-k relevant chunks for a query.\n        \n        Args:\n            query: Query string\n            k: Number of chunks to retrieve\n        \n        Returns:\n            List of (chunk, similarity_score) tuples\n        """\n        # TODO: Implement retrieval\n        pass'
),
(
  'Sentiment Analysis Model',
  'sentiment-analysis-model',
  'Build a sentiment analysis model that can classify text as positive, negative, or neutral. Focus on preprocessing, feature extraction, and model training.',
  'ai_engineering',
  'easy',
  '## Task\nClassify text sentiment as positive (2), neutral (1), or negative (0).\n\n## Dataset\n- **text**: The text to analyze\n- **sentiment**: Target label (0, 1, or 2)\n\n## Requirements\n1. Clean and preprocess text\n2. Extract features (TF-IDF, word embeddings, etc.)\n3. Train a classification model\n4. Return sentiment predictions\n\n## Evaluation\nAccuracy on test set. Target: Accuracy > 0.70',
  'accuracy',
  0.70,
  '# Sentiment Analysis\nimport pandas as pd\nimport numpy as np\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.naive_bayes import MultinomialNB\n\ndef preprocess_text(text: str) -> str:\n    """\n    Clean and preprocess text.\n    """\n    # TODO: Implement preprocessing\n    return text.lower()\n\ndef solution(train_data, test_data):\n    """\n    Classify text sentiment.\n    \n    Args:\n        train_data: DataFrame with ''text'' and ''sentiment'' columns\n        test_data: DataFrame with ''text'' column only\n    \n    Returns:\n        predictions: numpy array of sentiment labels\n    """\n    # Your code here\n    pass'
),
(
  'Feature Engineering Pipeline',
  'feature-engineering-pipeline',
  'Create an automated feature engineering pipeline that can handle missing values, encode categorical variables, scale numerical features, and create polynomial features.',
  'data_science',
  'medium',
  '## Task\nBuild a reusable feature engineering pipeline.\n\n## Requirements\n1. Handle missing values appropriately\n2. Encode categorical variables\n3. Scale numerical features\n4. Generate polynomial features where appropriate\n5. Return transformed dataset\n\n## Evaluation\nPipeline will be tested on held-out data. Evaluated on downstream model performance.',
  'accuracy',
  0.80,
  '# Feature Engineering Pipeline\nimport pandas as pd\nimport numpy as np\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler, PolynomialFeatures\nfrom sklearn.impute import SimpleImputer\n\nclass FeatureEngineer:\n    def __init__(self):\n        self.pipeline = None\n        self.categorical_columns = []\n        self.numerical_columns = []\n    \n    def fit(self, data: pd.DataFrame) -> ''FeatureEngineer'':\n        """\n        Fit the feature engineering pipeline.\n        """\n        # TODO: Implement fit\n        pass\n    \n    def transform(self, data: pd.DataFrame) -> pd.DataFrame:\n        """\n        Transform data using fitted pipeline.\n        """\n        # TODO: Implement transform\n        pass\n    \n    def fit_transform(self, data: pd.DataFrame) -> pd.DataFrame:\n        """\n        Fit and transform in one step.\n        """\n        self.fit(data)\n        return self.transform(data)'
),
(
  'LLM Prompt Engineering',
  'llm-prompt-engineering',
  'Design and implement effective prompts for various LLM tasks including summarization, question answering, and code generation. Learn to use few-shot learning and chain-of-thought prompting.',
  'ai_engineering',
  'medium',
  '## Task\nImplement various prompting strategies for LLM tasks.\n\n## Strategies to Implement\n1. **Zero-shot prompting**\n2. **Few-shot prompting** with examples\n3. **Chain-of-thought** prompting\n4. **Self-consistency** prompting\n\n## Requirements\n- Implement prompt templates\n- Handle different task types\n- Parse LLM outputs correctly\n\n## Evaluation\nTask completion accuracy across multiple scenarios.',
  'accuracy',
  0.75,
  '# LLM Prompt Engineering\nfrom typing import List, Dict, Any\n\nclass PromptEngineer:\n    def __init__(self):\n        self.templates = {}\n    \n    def zero_shot_prompt(self, task: str, input_text: str) -> str:\n        """\n        Create a zero-shot prompt for the given task.\n        \n        Args:\n            task: Task type (summarize, qa, code)\n            input_text: Input text to process\n        \n        Returns:\n            Formatted prompt string\n        """\n        # TODO: Implement zero-shot prompting\n        pass\n    \n    def few_shot_prompt(\n        self, \n        task: str, \n        input_text: str, \n        examples: List[Dict[str, str]]\n    ) -> str:\n        """\n        Create a few-shot prompt with examples.\n        \n        Args:\n            task: Task type\n            input_text: Input to process\n            examples: List of {input, output} examples\n        \n        Returns:\n            Formatted prompt with examples\n        """\n        # TODO: Implement few-shot prompting\n        pass\n    \n    def chain_of_thought_prompt(self, task: str, input_text: str) -> str:\n        """\n        Create a chain-of-thought prompt.\n        """\n        # TODO: Implement CoT prompting\n        pass'
);

-- Set one as today's daily challenge
UPDATE public.problems 
SET is_daily = true, daily_date = CURRENT_DATE 
WHERE slug = 'sentiment-analysis-model';
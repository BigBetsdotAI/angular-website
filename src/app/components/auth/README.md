# Authentication Components

This directory contains the authentication UI components for the BigBets.AI platform.

## Files

### `bubble-test.html`
- **Main Authentication Page**: Complete standalone HTML page with sparkle animation effects
- **Features**: 
  - Login/Register form switching
  - Social media OAuth integration (Instagram, Facebook, X/Twitter, LinkedIn, YouTube)
  - Animated sparkle background effects
  - Responsive glassmorphism design
  - Form validation
- **Tech Stack**: Vanilla HTML/CSS/JS with Tailwind CSS

### `test.html` 
- **React Version**: Authentication page using React createElement syntax
- **Features**:
  - Large bubble animation effects (30px-80px)
  - Social OAuth buttons
  - Form switching between login/register
- **Tech Stack**: React with Tailwind CSS

### `test-fixed.html`
- **JSX Version**: Cleaner JSX syntax implementation
- **Features**:
  - Enhanced bubble visibility and effects
  - Glassmorphism design
  - Social media integration
- **Tech Stack**: React JSX with Tailwind CSS

## Animation Effects

### Sparkle Effects (bubble-test.html)
- 16 animated sparkles with radial gradient backgrounds
- Twinkling animations with opacity and scale changes
- CSS pseudo-elements for star ray effects
- Color variations: blue-white, golden, purple

### Bubble Effects (test.html, test-fixed.html)
- Large floating bubbles with rotation and translation
- Glassmorphism styling with backdrop blur
- Left and right positioned animations
- Enhanced visibility with borders and shadows

## Integration Notes

To integrate these components into the Angular application:

1. Convert HTML templates to Angular component templates
2. Extract CSS animations to component stylesheets
3. Implement form validation using Angular Reactive Forms
4. Add proper TypeScript interfaces for form data
5. Integrate with authentication services
6. Add route guards for protected pages

## Usage

The `bubble-test.html` file can be viewed directly in a browser as a standalone authentication page, while the React versions are designed for integration into larger React applications.
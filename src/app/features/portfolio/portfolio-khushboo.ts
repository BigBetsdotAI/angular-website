import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio-khushboo',
  imports: [CommonModule],
  templateUrl: './portfolio-khushboo.html',
  styleUrl: './portfolio-khushboo.scss'
})
export class PortfolioKhushboo implements OnInit {
  
  activeTab: string = 'Acting Stills';
  currentSlide: number = 0;
  scrollY: number = 0;
  
  testimonials = [
    { quote: "Khushboo brings incredible energy and professionalism to every project.", author: "Director Name", role: "Film Director" },
    { quote: "Working with Khushboo was an absolute pleasure. Her dedication is unmatched.", author: "Producer Name", role: "Executive Producer" },
    { quote: "A talented actress who truly understands the craft of storytelling.", author: "Co-Star Name", role: "Lead Actor" },
    { quote: "Khushboo Kamal is fantastic to work with — professional, creative, and radiant on set.", author: "Brand Partner", role: "Collaborated With" }
  ];

  actingStills = [
    { title: 'Emotional Drama Scene', image: 'https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/k1.png' },
    { title: 'Comedy Moment', image: 'https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/k2.png' },
    { title: 'Cinematic Close-up', image: 'https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/k3.png' },
    { title: 'Intense Character', image: 'https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/k4.png' }
  ];

  photoshootImages = [
    { title: 'High Fashion Editorial', caption: 'Gold jewelry elegance', image: 'https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/k5.png' },
    { title: 'Natural Outdoor', caption: 'Soft light candid', image: 'https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/k6.png' },
    { title: 'Magazine Cover', caption: 'Editorial perfection', image: 'https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/k7.png' }
  ];

  btsImages = [
    { title: 'Script Reading', caption: 'Holding script while smiling', image: 'https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/k8.png' },
    { title: 'Crew Together', caption: 'Team collaboration', image: 'https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/k9.png' },
    { title: 'Makeup Room', caption: 'Mirror reflection moment', image: 'https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/k1.png' }
  ];

  brandCampaigns = [
    { 
      title: 'Nykaa Skincare', 
      description: 'Celebrating natural beauty through the Glow Naturally campaign.',
      hasVideo: true,
      duration: '15 sec'
    },
    { 
      title: 'Biba India', 
      description: 'Festive elegance meets everyday grace in the #StyleInMotion series.',
      hasVideo: false
    },
    { 
      title: 'L\'Oréal Paris', 
      description: 'Empowering women to feel beautiful in their own skin.',
      hasVideo: false
    }
  ];

  brandLogos = ['Nykaa', 'Biba', 'L\'Oréal', 'Amazon Fashion', 'Lakmé'];

  // TV Shows section data (replaces Brand tab)
  tvShows = [
    {
      title: 'Bhabiji Ghar Par Hain',
      genre: 'Comedy',
      network: '&TV',
      description: 'Known for her infectious energy and perfect comic timing, Khushboo’s portrayal brought a refreshing spark to this hit sitcom.',
      clip: 'https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/bhabiji_clip.mp4',
      stills: [
        'https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/Bhabhiji-ghar-par-hai.jpg'
      ]
    },
    {
      title: 'Jijaji Chhat Par Hain',
      genre: 'Comedy',
      network: 'SAB TV',
      description: 'Her fun-loving and expressive role made audiences instantly connect with her cheerful on-screen persona.',
      clip: 'https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/jijaji_montage.mp4',
      quote: 'Every scene is a celebration of laughter and timing.',
      stills: ['https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/Jijaji-Chhat-Per-Hain1_Circular_Image.jpg']
    },
    {
      title: 'Zindagi Ki Mahek',
      genre: 'Drama',
      network: 'Zee TV',
      description: 'In this emotional journey, Khushboo portrayed depth and realism that left a lasting mark on viewers.',
      clip: '',
      stills: ['https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/Zindagi+Ki+Mahek+(Drama++Zee+TV).jpg']
    },
    {
      title: 'Savdhaan India',
      genre: 'Crime Drama',
      network: 'Star Bharat',
      description: 'Portraying strong and impactful characters, Khushboo brought awareness to real-life issues through her powerful performances.',
      clip: 'https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/savdhaan_reel.mp4',
      stills: ['https://bitbet33-images-apne1.s3.ap-northeast-1.amazonaws.com/Savdhaan+India.jpeg']
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Portfolio component initialized. Active tab:', this.activeTab);
    console.log('Acting stills count:', this.actingStills.length);
    console.log('Photoshoot images count:', this.photoshootImages.length);
    console.log('BTS images count:', this.btsImages.length);
    console.log('Brand campaigns count:', this.brandCampaigns.length);
    
    // Scroll to top when portfolio component is initialized
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.initParallax();
      this.initScrollAnimations();

      // Autoplay BTS video when visible
      setTimeout(() => {
        const btsVideo = document.getElementById('btsVideo') as HTMLVideoElement;
        if (btsVideo) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                btsVideo.play();
              } else {
                btsVideo.pause();
              }
            });
          }, { threshold: 0.5 });
          observer.observe(btsVideo);
        }
      }, 500);

      // Autoplay photoshoot BTS video when visible (plays muted) and hide overlay while playing
      setTimeout(() => {
        const psVideo = document.getElementById('photoshootBts') as HTMLVideoElement;
        const videoCard = document.querySelector('.photo-card.video-card') as HTMLElement;
        const overlay = document.querySelector('.photo-card.video-card .video-overlay') as HTMLElement;
        if (psVideo && videoCard) {
          // Ensure autoplay-friendly attributes
          psVideo.muted = true;
          psVideo.loop = true;
          psVideo.playsInline = true;

          // Observe the card container (better intersection target than the video element)
          const psObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // Play only if user agent allows autoplay (muted)
                psVideo.play().catch(() => {});
                if (overlay) overlay.classList.add('hidden');
              } else {
                psVideo.pause();
                if (overlay) overlay.classList.remove('hidden');
              }
            });
          }, { threshold: 0.6 });
          psObserver.observe(videoCard);
        }
      }, 700);
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollY = window.scrollY;
      this.updateParallax();
      this.animateOnScroll();
    }
  }

  initParallax() {
    // Parallax initialization
  }

  updateParallax() {
    const heroSection = document.querySelector('.hero-section') as HTMLElement;
    if (heroSection) {
      heroSection.style.transform = `translateY(${this.scrollY * 0.5}px)`;
    }
  }

  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        } else {
          entry.target.classList.remove('animate-in');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    // Observer for slide-in animations (About section) - bidirectional
    const slideObserverOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    };

    const slideObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          // Remove visible class when scrolling out
          entry.target.classList.remove('visible');
        }
      });
    }, slideObserverOptions);

    const slideElements = document.querySelectorAll('.slide-in-from-left, .slide-in-from-right');
    slideElements.forEach(el => slideObserver.observe(el));
  }

  animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight * 0.8) {
        el.classList.add('visible');
      }
    });
  }

  setActiveTab(tab: string) {
    console.log('Setting active tab to:', tab);
    this.activeTab = tab;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  // Button action methods
  followMe() {
    // Open Instagram profile in new tab
    window.open('https://www.instagram.com/khushboo_kamal/', '_blank');
  }

  hireMe() {
    // Scroll to contact section or open contact page
    const contactSection = document.querySelector('.contact-cta');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  downloadPortfolio() {
    // Trigger browser's print dialog (Ctrl+P) to allow user to save as PDF
    if (isPlatformBrowser(this.platformId)) {
      window.print();
    }
  }

  aboutMe() {
    // Scroll to about section
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  contactMe() {
    // Navigate to the contact page
    this.router.navigate(['/contact']);
  }

  togglePhotoshootBts() {
    if (!isPlatformBrowser(this.platformId)) return;
    const vid = document.getElementById('photoshootBts') as HTMLVideoElement;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
    } else {
      vid.pause();
    }
  }
}

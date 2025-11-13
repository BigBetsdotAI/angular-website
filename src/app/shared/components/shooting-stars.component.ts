import { Component, OnInit, OnDestroy } from '@angular/core';

interface ShootingStar {
  id: number;
  top: number;
  left: number;
  animationDelay: number;
}

@Component({
  selector: 'app-shooting-stars',
  standalone: true,
  template: `
    <div class="shooting-stars-container">
      @for (star of stars; track star.id) {
        <div 
          class="shooting-star"
          [style.top.%]="star.top"
          [style.left.%]="star.left"
          [style.animation-delay.s]="star.animationDelay">
        </div>
      }
    </div>
  `,
  styles: [`
    .shooting-stars-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9997;
      overflow: hidden;
    }

    .shooting-star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: #ffffff;
      border-radius: 50%;
      box-shadow: 0 0 10px 2px #ffffff, 0 0 20px 4px #ffd700;
      animation: shoot 3s ease-out infinite;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 80px;
        height: 1px;
        background: linear-gradient(
          to left,
          #ffffff,
          rgba(255, 255, 255, 0.8),
          transparent
        );
        transform: translateX(-80px) translateY(1px);
      }
    }

    @keyframes shoot {
      0% {
        transform: translateX(0) translateY(0) scale(1);
        opacity: 1;
      }
      70% {
        opacity: 1;
      }
      100% {
        transform: translateX(-300px) translateY(300px) scale(0);
        opacity: 0;
      }
    }

    @media (max-width: 768px) {
      .shooting-star::before {
        width: 50px;
        transform: translateX(-50px) translateY(1px);
      }
      
      @keyframes shoot {
        0% {
          transform: translateX(0) translateY(0) scale(1);
          opacity: 1;
        }
        70% {
          opacity: 1;
        }
        100% {
          transform: translateX(-200px) translateY(200px) scale(0);
          opacity: 0;
        }
      }
    }
  `]
})
export class ShootingStarsComponent implements OnInit, OnDestroy {
  stars: ShootingStar[] = [];
  private intervalId: any;
  private starIdCounter = 0;

  ngOnInit() {
    this.generateInitialStars();
    // Add new shooting stars periodically (every 5-10 seconds)
    this.intervalId = setInterval(() => {
      this.addNewStar();
    }, Math.random() * 5000 + 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private generateInitialStars() {
    // Start with 3 shooting stars
    for (let i = 0; i < 3; i++) {
      this.stars.push(this.generateStar());
    }
  }

  private addNewStar() {
    this.stars.push(this.generateStar());
    
    // Remove old stars (keep max 6)
    if (this.stars.length > 6) {
      this.stars.shift();
    }
  }

  private generateStar(): ShootingStar {
    return {
      id: this.starIdCounter++,
      top: Math.random() * 50, // Top half of screen
      left: Math.random() * 50 + 50, // Right side of screen
      animationDelay: Math.random() * 3
    };
  }
}

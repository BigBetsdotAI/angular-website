import { Component, OnInit } from '@angular/core';

interface ChristmasDecoration {
  type: 'star';
  top: number;
  left: number;
  animationDelay: number;
}

@Component({
  selector: 'app-christmas-decorations',
  standalone: true,
  template: `
    <div class="christmas-decorations-container">
      <!-- Christmas Lights Border -->
      <div class="christmas-lights"></div>
      
      <!-- Floating Decorations -->
      @for (decoration of decorations; track decoration.type + decoration.left) {
        @if (decoration.type === 'star') {
          <div 
            class="christmas-star"
            [style.top.%]="decoration.top"
            [style.left.%]="decoration.left"
            [style.animation-delay.s]="decoration.animationDelay">
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .christmas-decorations-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9998;
      overflow: hidden;
    }

    .christmas-lights {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: linear-gradient(
        to right,
        #c41e3a 0%, #c41e3a 10%,
        #0f8a5f 10%, #0f8a5f 20%,
        #ffd700 20%, #ffd700 30%,
        #c41e3a 30%, #c41e3a 40%,
        #0f8a5f 40%, #0f8a5f 50%,
        #ffd700 50%, #ffd700 60%,
        #c41e3a 60%, #c41e3a 70%,
        #0f8a5f 70%, #0f8a5f 80%,
        #ffd700 80%, #ffd700 90%,
        #c41e3a 90%, #c41e3a 100%
      );
      animation: lights-flicker 2s infinite;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
      z-index: 10000;
    }

    @keyframes lights-flicker {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }

    .christmas-star {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #ffd700;
      border-radius: 50%;
      box-shadow: 0 0 10px #ffd700;
      animation: twinkle 2s ease-in-out infinite;
      
      &::before,
      &::after {
        content: '';
        position: absolute;
        background: #ffd700;
      }
      
      &::before {
        width: 4px;
        height: 1px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      
      &::after {
        width: 1px;
        height: 4px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    @keyframes twinkle {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.3;
        transform: scale(0.8);
      }
    }

    @media (max-width: 768px) {
      .christmas-star {
        transform: scale(0.8);
      }
    }
  `]
})
export class ChristmasDecorationsComponent implements OnInit {
  decorations: ChristmasDecoration[] = [];

  ngOnInit() {
    this.generateDecorations();
  }

  private generateDecorations() {
    // Add stars only
    for (let i = 0; i < 20; i++) {
      this.decorations.push({
        type: 'star',
        top: Math.random() * 80 + 10,
        left: Math.random() * 90 + 5,
        animationDelay: Math.random() * 2
      });
    }
  }
}

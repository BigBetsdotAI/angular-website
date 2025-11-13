import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-christmas-greeting',
  standalone: true,
  template: `
    <div class="christmas-greeting" [class.show]="showGreeting" [class.hide]="hideGreeting">
      <div class="greeting-content">
        <div class="greeting-icon">🎄</div>
        <h2>Merry Christmas!</h2>
        <p>Welcome to our festive website! ✨</p>
        <button (click)="closeGreeting()" class="close-greeting">
          Got it! 🎁
        </button>
      </div>
      <div class="greeting-snowflakes">
        <span class="greeting-snow">❄</span>
        <span class="greeting-snow">❅</span>
        <span class="greeting-snow">❆</span>
      </div>
    </div>
  `,
  styles: [`
    .christmas-greeting {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: linear-gradient(135deg, rgba(15, 32, 39, 0.98), rgba(32, 58, 67, 0.98));
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 3px solid #ffd700;
      border-radius: 20px;
      padding: 40px;
      z-index: 10001;
      box-shadow: 
        0 20px 60px rgba(0, 0, 0, 0.5),
        0 0 60px rgba(255, 215, 0, 0.4),
        inset 0 0 40px rgba(255, 215, 0, 0.1);
      opacity: 0;
      transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      pointer-events: none;
      max-width: 90%;
      width: 400px;
      text-align: center;
      
      &.show {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
        pointer-events: all;
        animation: greeting-entrance 0.6s ease-out;
      }
      
      &.hide {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0;
        pointer-events: none;
      }
    }

    @keyframes greeting-entrance {
      0% {
        transform: translate(-50%, -50%) scale(0) rotate(-180deg);
      }
      60% {
        transform: translate(-50%, -50%) scale(1.1) rotate(10deg);
      }
      100% {
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
      }
    }

    .greeting-content {
      position: relative;
      z-index: 2;
    }

    .greeting-icon {
      font-size: 60px;
      margin-bottom: 20px;
      animation: icon-rotate 3s ease-in-out infinite;
    }

    @keyframes icon-rotate {
      0%, 100% {
        transform: rotate(-10deg);
      }
      50% {
        transform: rotate(10deg);
      }
    }

    h2 {
      color: #ffd700;
      font-size: 32px;
      margin: 0 0 10px 0;
      text-shadow: 
        0 0 20px rgba(255, 215, 0, 0.8),
        0 0 40px rgba(196, 30, 58, 0.4);
      animation: text-glow 2s ease-in-out infinite;
      background: linear-gradient(45deg, #ffd700, #ffffff, #ffd700);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
    }

    @keyframes text-glow {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    p {
      color: #ffffff;
      font-size: 18px;
      margin: 0 0 30px 0;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }

    .close-greeting {
      background: linear-gradient(135deg, #c41e3a, #8b0000);
      border: 2px solid #ffd700;
      color: #ffffff;
      padding: 12px 30px;
      border-radius: 25px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 
        0 5px 15px rgba(196, 30, 58, 0.4),
        inset 0 -3px 5px rgba(0, 0, 0, 0.2);
      text-transform: uppercase;
      
      &:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 
          0 8px 20px rgba(196, 30, 58, 0.6),
          0 0 30px rgba(255, 215, 0, 0.5);
      }
      
      &:active {
        transform: translateY(-1px) scale(1.02);
      }
    }

    .greeting-snowflakes {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .greeting-snow {
      position: absolute;
      color: rgba(255, 255, 255, 0.6);
      font-size: 20px;
      animation: greeting-snow-fall 4s linear infinite;
      
      &:nth-child(1) {
        left: 20%;
        animation-delay: 0s;
      }
      
      &:nth-child(2) {
        left: 50%;
        animation-delay: 1s;
      }
      
      &:nth-child(3) {
        left: 80%;
        animation-delay: 2s;
      }
    }

    @keyframes greeting-snow-fall {
      0% {
        top: -20px;
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        top: 100%;
        opacity: 0;
      }
    }

    @media (max-width: 768px) {
      .christmas-greeting {
        width: 90%;
        padding: 30px 20px;
      }
      
      .greeting-icon {
        font-size: 50px;
      }
      
      h2 {
        font-size: 26px;
      }
      
      p {
        font-size: 16px;
      }
    }
  `]
})
export class ChristmasGreetingComponent implements OnInit {
  showGreeting = false;
  hideGreeting = false;

  ngOnInit() {
    // Check if user has already seen the greeting
    const hasSeenGreeting = localStorage.getItem('christmasGreetingSeen');
    
    if (!hasSeenGreeting) {
      // Show greeting after 1 second
      setTimeout(() => {
        this.showGreeting = true;
      }, 1000);
    }
  }

  closeGreeting() {
    this.hideGreeting = true;
    // Mark as seen
    localStorage.setItem('christmasGreetingSeen', 'true');
    
    // Remove from DOM after animation
    setTimeout(() => {
      this.showGreeting = false;
    }, 500);
  }
}

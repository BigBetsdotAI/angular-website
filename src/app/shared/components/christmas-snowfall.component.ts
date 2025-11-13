import { Component, OnInit, OnDestroy } from '@angular/core';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  fontSize: number;
  opacity: number;
  character: string;
}

@Component({
  selector: 'app-christmas-snowfall',
  standalone: true,
  template: `
    <div class="snowfall-container">
      @for (snowflake of snowflakes; track snowflake.id) {
        <div 
          class="snowflake"
          [style.left.%]="snowflake.left"
          [style.animation-duration.s]="snowflake.animationDuration"
          [style.animation-delay.s]="snowflake.animationDelay"
          [style.font-size.em]="snowflake.fontSize"
          [style.opacity]="snowflake.opacity">
          {{ snowflake.character }}
        </div>
      }
    </div>
  `,
  styles: [`
    .snowfall-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }

    .snowflake {
      position: absolute;
      top: -10px;
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
      user-select: none;
      animation: snowfall linear infinite, sway ease-in-out infinite;
    }

    @keyframes snowfall {
      0% {
        top: -10%;
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        top: 110%;
        opacity: 0;
      }
    }

    @keyframes sway {
      0%, 100% {
        transform: translateX(0);
      }
      50% {
        transform: translateX(50px);
      }
    }
  `]
})
export class ChristmasSnowfallComponent implements OnInit, OnDestroy {
  snowflakes: Snowflake[] = [];
  private snowflakeCount = 50;
  private intervalId: any;
  private snowflakeCharacters = ['❅', '❆', '❄', '✻', '✼', '❉'];

  ngOnInit() {
    this.createSnowflakes();
    // Add new snowflakes periodically
    this.intervalId = setInterval(() => {
      this.addNewSnowflake();
    }, 300);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private createSnowflakes() {
    for (let i = 0; i < this.snowflakeCount; i++) {
      this.snowflakes.push(this.generateSnowflake(i));
    }
  }

  private addNewSnowflake() {
    if (this.snowflakes.length < 100) {
      this.snowflakes.push(this.generateSnowflake(Date.now()));
    }
    // Remove old snowflakes
    if (this.snowflakes.length > 100) {
      this.snowflakes.shift();
    }
  }

  private generateSnowflake(id: number): Snowflake {
    return {
      id,
      left: Math.random() * 100,
      animationDuration: Math.random() * 10 + 10, // 10-20 seconds
      animationDelay: Math.random() * 5,
      fontSize: Math.random() * 1 + 0.5, // 0.5-1.5em
      opacity: Math.random() * 0.6 + 0.4, // 0.4-1
      character: this.snowflakeCharacters[Math.floor(Math.random() * this.snowflakeCharacters.length)]
    };
  }
}

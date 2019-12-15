import { Injectable } from '@angular/core';

@Injectable()
export class Slots {
  slots:Array<any> = [
    '',
    '10 coins - 1 hour',
    '50 coins - 1 hour',
    '100 coins - 1 hour',
    '20 coins - 1 Day',
    '20 coins - Infinite',
    '50 coins - Infinite',
    '100 coins - Infinite',
    '',
    'Live'
  ];
}


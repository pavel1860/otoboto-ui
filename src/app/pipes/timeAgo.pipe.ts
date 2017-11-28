import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timeAgo'})
export class TimeAgoPipe implements PipeTransform {
  transform(value: number): string {
        let timeDiff = this.computeTimeDiff(value);
        return this.computeCaption(timeDiff);
  }

  computeTimeDiff(value) {
    let dateParts = value.split(' '); 
    let date = dateParts[0];
    let time = dateParts[1];
    let dateArray = date.split('-').map(item => {return parseInt(item)});
    let timeArray = time.split(':').map(item => {return parseInt(item)});
    let postDateDesc = new Date(dateArray[2], dateArray[1], dateArray[0], timeArray[0], timeArray[1], 0, 0);
    let postDate = postDateDesc.getTime(); 
    let currentDate = new Date().getTime(); 
    return currentDate - postDate; 
  }

  computeCaption(timeDiff) {

    timeDiff = timeDiff/1000/60;
    if (timeDiff <= 1) {
        return "פורסם הרגע"
      } 

      if ((timeDiff > 1) && (timeDiff < 60)) {
        return "לפני " + timeDiff + ' דקות'; 
      }

      timeDiff = timeDiff/60; //hours
      timeDiff = Math.floor(timeDiff);

      if (timeDiff == 1) {
        return 'לפני שעה';
      }

      if ((timeDiff > 1) && (timeDiff <= 24)) {
        return "לפני " + timeDiff + ' שעות'; 
      }

      timeDiff = timeDiff/24; //days
      timeDiff = Math.floor(timeDiff);

      if (timeDiff == 1) {
        return 'אתמול';
      }

      if (timeDiff == 2) {
        return 'שלשום';
      }

      if ((timeDiff > 2) && (timeDiff <= 24)) {
        return "לפני " + timeDiff + ' ימים'; 
      }      

      timeDiff = timeDiff/28; //month
      timeDiff = Math.floor(timeDiff);  
      
      if (timeDiff == 1) {
        return 'חודש שעבר';
      } 

      if (timeDiff == 2) {
        return 'לפני חודשיים';
      }  

      if ((timeDiff > 2) && (timeDiff <= 12)) {
        return "לפני " + timeDiff + ' חודשים'; 
      }  

      timeDiff = timeDiff/12; //years
      timeDiff = Math.floor(timeDiff); 
      
      if (timeDiff == 1) {
        return 'שנה שעברה';
      }   

      if (timeDiff == 2) {
        return 'לפני שנתיים';
      }  

      if (timeDiff > 2) {
        return "לפני " + timeDiff + ' שנים'; 
      }   

      return 'לא ידוע'; 
         
  }
}
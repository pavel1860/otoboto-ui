import { Component, Input } from '@angular/core';
import { GaugeSegment, GaugeLabel } from 'ng-gauge';

@Component({
  selector: 'rank-gauge',
  templateUrl: './rank-gauge.component.html',
  styleUrls: ['./rank-gauge.component.scss']
})

export class RankGaugeComponent {

    @Input() rank; 
    graph; 

    ngOnInit() {

        let value = Math.round(this.rank * 10) / 10;
        let valuePrec = (value/10) * 100; 

        this.graph = {
            bgRadius: 80,
            bgColor: "white",
            rounded: false,
            reverse: false,
            animationSecs: 1,
            segments: [
                new GaugeSegment({
                    value: valuePrec,
                    color: '#14C6C6',
                    borderWidth: 14
                }), 
                new GaugeSegment({
                    value: 100,
                    color: '#F6F6F6',
                    borderWidth: 14
                })                
            ],
            labels: [

            ]            
        };      
    }

}

import { Component, OnInit, Input } from '@angular/core';
import { IGlossary } from 'src/app/model/glossary';
import { GroupByPipe } from 'src/app/core/pipe/groupByPipe/group-by.pipe';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent implements OnInit {
  @Input() glossary: IGlossary[];
  sortedGlossary: { key: string, glossary: IGlossary[] }[];
  currentGlossary: { key: string, glossary: IGlossary[] };
  constructor(private groupBy: GroupByPipe) {
  }

  ngOnInit() {
    this.sortedGlossary = this.groupBy.transform(this.glossary);
    this.currentGlossary = this.sortedGlossary[0];
  }

  getAlphabetsLinks() {
    const alphabets = [];
    for (let i = 65; i <= 90; i++) {
      alphabets.push(String.fromCharCode(i));
    }
    return alphabets;
  }

  getGlossary(alphabet: string) {
    this.currentGlossary = this.sortedGlossary.filter(c => c.key === alphabet)[0];
  }
}

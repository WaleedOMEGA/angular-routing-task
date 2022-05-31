import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpBackendService } from '../http-backend.service';
import { Task } from '../task';
const introTask = {
  title: 'Welcome!',
  description: 'Welcome on our platform!',
};
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  task: 'loading' | 'error' | Task = 'loading';

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpBackendService
  ) {}

  ngOnInit(): any {
    /* *******************************************************************************************
     * The sample code below is just here to help you (you have somehow to combine the 2 samples).
     * You can delete it once you have read it.
     * ******************************************************************************************* */

    // sample 1:
    // "this.activatedRoute.paramMap" returns an observable with emit an
    // event each time there is a route parameter change
    this.activatedRoute.paramMap.subscribe((params) => {
      const idAsString: string | null = params.get('id');

      this.handleId(idAsString);

    });


  }
  handleId(id: string | null): void {
    console.log(id);
    if (id === null) {
   this.task = introTask;
   return;
 }
    const Id = +id;
    if (isNaN(Id)) {
   this.task = 'error';
 } else {
   this.getTask(Id);
 }
  }
  getTask(id: number): void {
    this.task = 'loading';
    this.http.getTaskForId(id)?.subscribe((task) => {
      this.task = task;


    },
      err => {
        this.task = 'error';
      }

    );
  }
}

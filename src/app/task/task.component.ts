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

  ngOnInit() {
    /* *******************************************************************************************
     * The sample code below is just here to help you (you have somehow to combine the 2 samples).
     * You can delete it once you have read it.
     * ******************************************************************************************* */

    // sample 1:
    // "this.activatedRoute.paramMap" returns an observable with emit an
    // event each time there is a route parameter change
    this.activatedRoute.paramMap.subscribe((params) => {
      const idAsString: string = params.get('id');
      if (idAsString === null) {
        this.task = introTask;
        return;
      }
      const id = +idAsString;
      if (isNaN(id)) {
        this.task = 'error';
      } else console.log('id in url: ' + id);
    });

    // sample 2:
    // "this.http.getTaskForId(<id>)" calls (asynchronous network call) a http service and returns an observable of task description for the requested task id.
    this.http.getTaskForId(2).subscribe((task) => {
      this.task = task;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {Course} from '../../students/course';
import {CourseServerService} from '../../service/course-server.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StudentsDataService} from '../../service/students-data.service';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {

  courses:Course[];
  constructor(private courseService:CourseServerService,private route:ActivatedRoute, private studentsDataService: StudentsDataService, private router: Router) { }

  result:string;
  ngOnInit() {



    this.studentsDataService.getStudentsData()
      .subscribe(
        (abc) => {},
        (error : Error) => {
          if (error.message === 'UnAuthorize'){
            this.router.navigate(['login'], {queryParams:{source:'student'}});
          }
        });


    this.route.queryParams
      .subscribe((params : Params) => {
      this.result = params['result'];
    });

    this.courseService.getCourse()
      .subscribe(courses=>this.courses = courses);
  }

}

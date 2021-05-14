import { Component, OnInit } from '@angular/core';
import { Todo, TodosService, HobbiArray } from '../shared/todos.service';
import { delay } from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'

interface Angular {
  value: string;
}

interface React {
  value: string;
}

interface Vue {
  value: string;
}

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  fn: string = ''
  ln: string = ''
  brthd?: any
  frmwrk: string = ''
  vrsn: string = ''
  mail: string = ''
  hb: string=''
  dur: number = 0

  load: boolean = true

  angulars: Angular[] = [
  {value: '1.1.1'},
  {value: '1.2.1'},
  {value: '1.3.3'}
];

reacts: React[] = [
{value: '2.1.2'},
{value: '3.2.4'},
{value: '4.3.1'}
];

vues: Vue[] = [
{value: '3.3.1'},
{value: '5.2.1'},
{value: '5.1.3'}
];

  constructor(public todosService: TodosService) { }

  ngOnInit(): void {
  }

  disableSelect = new FormControl(true);

  addTodoHobbi(){
    const hobbi: HobbiArray = {
      nameHobbi: this.hb,
      duration: this.dur
    }
    this.todosService.addTodoHobbi(hobbi)
    console.log(this.todosService.hobbies)

    alert('Хобби добавлено.')
  }

  addTodo(){

    const todo: Todo = {
      id: Date.now(),
      firstName: this.fn,
      lastName: this.ln,
      birthday: this.brthd,
      framework: this.frmwrk,
      version: this.vrsn,
      email: this.mail,
      hobbi: this.todosService.hobbies
    }
    if (this.todosService.todos.some(t=>t.email == this.mail))
    {
      delay(2000)
      alert('Такой emai уже существует.')
    }
    else
    {
      if(this.todosService.hobbies.length !== 0)
      {
        this.todosService.addTodo(todo)
        console.log(this.todosService.todos)
        this.todosService.hobbies = []

        this.fn = ''
        this.ln = ''
        this.brthd = ''
        this.frmwrk = ''
        this.vrsn = ''
        this.mail = ''
        this.hb =''
        this.dur = 0
      }
      else
      {
        alert('Добавьте хотя бы одно хобби')
      }
    }

  }

  vers(){
    this.disableSelect = new FormControl(false);
  }

}

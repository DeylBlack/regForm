import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export interface HobbiArray{
  nameHobbi: string
  duration: number
}

export interface Todo{
  id: number
  firstName: string
  lastName: string
  birthday: string
  framework: string
  version: string
  email: string
  hobbi: HobbiArray[]
}

@Injectable({providedIn: 'root'})
export class TodosService{
  public todos: Todo[] = []
  public hobbies: HobbiArray[] = []

  constructor(private http: HttpClient) {}

  fetchTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=0')
    .pipe(tap(todos => this.todos = todos))
  }

  onToggle(id:number){
  }

  removeTodo(id:number){
    this.todos = this.todos.filter(t => t.id !== id)
  }

  addTodo(todo: Todo){
    this.todos.push(todo)
  }

  addTodoHobbi(hobbi: HobbiArray){
    this.hobbies.push(hobbi)
  }
}

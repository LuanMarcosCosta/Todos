import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Todo } from 'src/models/todos.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: string = 'list';
  public todos: Todo[] = [];
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    })
    this.load();
  }

  clear() {
    this.form.reset();
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index != -1) {
      this.todos.splice(index, 1);

    }
    this.save(); //após executar a verificação, você consegue salvar
  }
  // 
  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();

  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();

  }

  // Salvando o código dos Todos temporariamente
  save() {
    const data = JSON.stringify(this.todos); //convertendo um JASON em uma string
    localStorage.setItem('todos', data);
    this.mode='list';
  }

  load() {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data); //String em um JSON.
    } else {
      this.todos = [];
    }
  }

  changeMode(mode: string){ //para mostrar a opção de registrar ou cancelar o registro!
    this.mode = mode;
  }

}
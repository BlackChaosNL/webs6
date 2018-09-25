import { Component } from '@angular/core';
import { PeopleService } from '../../../services/people.service';
import { Person } from '../../../classes/person';

@Component({
  selector: 'add-person',
  template: `
  <div class="input-group">
  <input
  	#fullname
  	class="form-control"
  	type="text"
  	placeholder="{{placeholder}}"
  	(keyup.enter)="send(fullname.value); fullname.value=''">
   <span class="input-group-btn">
	   <button
	   class="btn btn-default bg-primary text-white"
	   type="button"
	   (click)="send(fullname.value); fullname.value=''">Add person</button>
   </span>
</div>

`,
})
export class AddPersonComponent{
	placeholder: String = "Your full name here.";
  	constructor(private db: PeopleService) { }

	send(fullname: String): void {
        const items = fullname.split(' ');
		if (items.length > 1) {
			var person: Person = new Person();
			person.name = items[0];
			person.surname = "";
			for(var i = 1; i < items.length; i++) {
				person.surname += (" " + items[i]);
			}
			this.db.Add(person);
		}
	}
}

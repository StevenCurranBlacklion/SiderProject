insert into project(project_id, username,description,target_date,is_done)
values(10001, 'steven808', 'Covid 19 App', sysdate(), false);

insert into project(project_id, username,description,target_date,is_done)
values(10002, 'steven808', 'Bug Tracker App', sysdate(), false);

insert into project(project_id, username,description,target_date,is_done)
values(10003, 'steven808', 'Shopping App', sysdate(), false);

insert into task(task_id, username,start_date,task, end_date, project_id, is_done)
values(1, 'steven808', sysdate(), 'Task1', sysdate(), 10001, false);

insert into employee(employee_id, username,first_name,last_name, project_id, task_id)
values(52480, 'steven808', 'Steven', 'Curran', 10001, 1);

insert into employee(employee_id, username,first_name,last_name, project_id, task_id)
values(78965, 'steven808', 'Adrian', 'Clear', 10001, null);

insert into employee(employee_id, username,first_name,last_name, project_id, task_id)
values(15642, 'steven808', 'Tom', 'Brady', null, null);
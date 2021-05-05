insert into project(project_id, username,description,target_date,is_done)
values(10001, 'SCurran', 'Covid 19 App', sysdate(), false);

insert into project(project_id, username,description,target_date,is_done)
values(10002, 'SCurran', 'Bug Tracker App', sysdate(), false);

insert into project(project_id, username,description,target_date,is_done)
values(10003, 'AClear', 'Shopping App', sysdate(), false);

insert into task(task_id, username,start_date,task, end_date, project_id, is_done)
values(1, 'SCurran', sysdate(), 'Task1', sysdate(), 10001, false);

insert into employee(employee_id, username,first_name,last_name, project_id, task_id)
values(52480, 'SCurran', 'Jimmy', 'Johnson', 10001, 1);

insert into employee(employee_id, username,first_name,last_name, project_id, task_id)
values(78965, 'AClear', 'Sarah', 'Hardy', 10001, null);

insert into employee(employee_id, username,first_name,last_name, project_id, task_id)
values(15642, 'SCurran', 'Tom', 'Brady', null, null);
Shopping for CondorLab
This application was built as an interview test for the CondorLab Company.

Frontend
Frontend Code is located at the folders "CondorLabTest/view" and Public/Javascritps. 
Used Ejs as the frontEnd Engine.
All the third libraries are located in the folder public/ExternalLibraris

BackEnd
Used nodejs As the Backend Server.
The third party modules can be identified by a comment at the top of the files.

Database
Used Postgres as the Database engine. The application is located in a docker container. Follow the instructions to run the database app.
Instruction to Run the App.
Execute the instruction in Ubuntu, or Linux based os.

Required Packages 

Nodejs v8.9 or superior
Docker  
 
Create a folder to download the web Application and open a terminal in the new folder and execute the following commands in order.
1.	git clone https://github.com/tatisgordon/CondorLabsShop.git
2.	sudo docker build --tag pg1 CondorLabsShop/Docker
3.	sudo docker run -p 5433:5432 pg1

//now open a new terminal in the same folder

4.	sudo npm --prefix CondorLabsShop install
5.	PGUSER=postgres PGHOST=localhost PGPASSWORD=123456 PGDATABASE=postgres PGPORT=5433  node CondorLabsShop/app.js
 
now  go to the url http://localhost:8000/

DROP TABLE IF EXISTS PreREQ; 
DROP TABLE IF EXISTS CoREQ;
DROP TABLE IF EXISTS Course;  

commit; 

CREATE TABLE Course(
	course_id			INT NOT NULL,
	course_title		VARCHAR(32),
	department			VARCHAR(32),
	course_description	VARCHAR(1024),		
	fall				INT, 
	spring				INT,
	summer				INT, 
	PRIMARY KEY (course_id)
);

CREATE TABLE PreREQ(
	id 					INT NOT NULL AUTO_INCREMENT,   
	course_id			INT NOT NULL,
	pre_req_id			INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (course_id) REFERENCES Course (course_id) ON DELETE CASCADE 
);

CREATE TABLE CoREQ(
    id 					INT NOT NULL AUTO_INCREMENT,               
	course_id			INT NOT NULL,
	co_req_id			INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (course_id) REFERENCES Course (course_id) ON DELETE CASCADE 
);

commit; 

insert into Course (course_id, course_title, department, course_description, fall, spring, summer)
values (0401, 'Intermediate Java', 'CS',  'This course is a rigorous introduction to the fundamental concepts and techniques 
	of computer programming using the java programming language. This is a first course for students who intend to major 
	in computer science.', 
	1, 1, 1
);

insert into Course (course_id, course_title, department, course_description, fall, spring, summer)
values (0445, 'Data Structures', 'CS', 
	'This course emphasizes the study of the basic data structures of computer science 
	(stacks, queues, trees, lists) and their implementations using the java language 
	included in this study are programming techniques which use recursion, reference 
	variables, and dynamic memory allocation. Students in this course are also introduced 
	to various searching and sorting methods and also expected to develop an intuitive understanding 
	of the complexity of these algorithms.',
	1, 1, 1
);

insert into Course (course_id, course_title, department, course_description, fall, spring, summer)
values (1501, 'Algorithm Implementation', 'CS',
	'The course covers a broad range of the most commonly used algorithms: some examples include algorithms 
	for sorting, searching, encryption, compression, and local search. The students will implement and test 
	several algorithms. The course is programming intensive.',
	1, 1, 1
); 

insert into Course (course_id, course_title, department, course_description, fall, spring, summer)
values (0441, 'Discrete Structures for CS', 'CS', 
	'The purpose of this course is to understand and use (abstract) discrete structures that are 
	backbones of computer science. In particular, this class is meant to introduce logic, proofs, 
	sets, relations, functions, counting, and probability, with an emphasis on applications 
	in computer science.',
	1, 1, 1
); 

insert into Course (course_id, course_title, department, course_description, fall, spring, summer)
values (0447, 'Computer Organization and Assembly Language', 'CS', 
	'The purpose of this course is to study the components of computing systems common to most 
	computer architectures. In particular, this class is meant to introduce data representation, 
	types of processors, memory types and hierarchy, and device drivers. The students will learn 
	MIPS assembly language, the design of arithmetic and logic units, and basic designs for RISC processors.',
	1, 1, 1
); 

insert into Course (course_id, course_title, department, course_description, fall, spring, summer)
values (0449, 'Introduction to Systems Software', 'CS',  
	'This course covers topics related to the interface of hardware and software. It covers device interfaces 
	and hardware synchronization at the lowest level of the operating system, the linkage of operating 
	service system services to application software, and the fundamental mechanisms for computer communications.',
	1, 1, 1
);

insert into Course (course_id, course_title, department, course_description, fall, spring, summer)
values (0220, 'Analytic Geometry and Calculus 1', 'MATH', 
	'This is the first of a sequence of three basic calculus courses. It covers the derivative and integral of functions 
	of one variable and their applications.',
	1, 1, 1
);

insert into PreREQ(course_id, pre_req_id)
values (0445, 0401);

insert into PreREQ(course_id, pre_req_id)
values (1501, 0441); 

insert into PreREQ(course_id, pre_req_id)
values (1501, 0445); 

insert into CoREQ(course_id, co_req_id)
values (0445, 0447);

insert into CoREQ(course_id, co_req_id)
values (0441, 0220);

commit; 








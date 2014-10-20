//this is how we are going to do our apps for the first couple of projects using express
// it's pretty simple, one file wii handle all of our routing/logic....more or less like a controller

module.exports = function Route(app){
	app.get("/",function (req,res){
		res.render('index',{title:'I love Alvaro', first_name:'Alvaro', last_name:'Canencia',stuff:['bacon','golf','beeer']})

	})

	app.get("/home/:country?",function(req,res){
		res.render('home',{address:'1157 Sandy Ridge Dr', zip: 95134, country:req.params.country});
	})

	app.post("/process", function(req,res){
		console.log(req)
		//res.render('new_view',req.body);

		req.session.name = req.body.name;
		req.session.email = req.body.email;
		req.session.sessionID = req.sessionID;
		req.session.music = req.body.music;
		req.session.day = req.body.day;

		//good practice to make sure that it saves the information after everything has been done
		req.session.save(function(){
			res.redirect('/users');
		})

		console.log(req.session.name);
		console.log(req.session.email);
		console.log (req.sessionID);
		console.log(req.session);
	})

	app.get("/users", function(req,res){
		res.render('users',{session:req.session})
	})



	//BEGIN SOCKET DEMONSTRATION

	app.get("/sockets", function(req,res){
		res.render("sockets");
	});

	//this is how the server listens for emits from the clients
	app.io.route('say_hi', function(req){
		console.log("------------someone is saying hi----------")
		console.log("THE MESSAGE ISSSSS:" + req.data.message)
		req.io.broadcast('say_hi_back', {greeting: "HIDEY HO!"});
	})

	//req.data -> sockets (although it is not really a request, in fact there is not a response, we can use "socket" instead of "req" later)
	//req.params -> URl/GET info
	//req.body -> form data via POST

	
	app.io.on('connection', function(req){
		console.log(req.handshake.sessionID + '--------------');
	})

	// app.io.route('disconnect', function(){
	// 	console.log('someone is getting out of here');
	// 	delete users[req.sessionID];
	// 	console.log(users)
	// })

	
}
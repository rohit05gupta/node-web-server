const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;


var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase(); 
});

app.use((req,res,next) => {
	res.render('maintenace.hbs',{
		Title: 'We\'ll Be Right Back',
		para: 'Site is currently under mainatainace we\'ll be back soon'
	});
});

app.use((req,res,next) => {
	var now = new Date();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log',log+'\n',(err) => {
		if(err){
			console.log('Unable to append  to server.log');
		}
	});
	next();
});

/*app.get('/',(req,res) => {
	res.render('home.hbs',{
		Title: 'Home Page',
		currentYear: new Date().getFullYear(),
		welcomeMessage: 'Welcome to the homepage..'
	})
});*/

app.get('/about',(req,res) => {
	res.render('about.hbs',{
		Title: 'About Page',
		currentYear: new Date().getFullYear()
	});
});


app.get('/bad',(req,res) => {
	res.send({
		errorMessage: 'Bad Server request'
	});
});

app.listen(port,() => {
	console.log(`Server is up on port ${port}`);
});
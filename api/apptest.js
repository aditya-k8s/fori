var express = require('express');
var app = express();
const officegen = require('officegen')
var fs = require('fs');

app.get('/doc', function (req,res) {
	 console.log('id: ' + req.query.author);
	 console.log('Comments: ' + req.query.comments);
	 console.log('company: ' + req.query.company);
	 var authorName= "---";
	 var commentsName= "---";
	 var companyName= "---";
	 if (req.query && req.query.author!='') {
	 	authorName=req.query.author;
	 }
	 if (req.query && req.query.comments!='') {
	 	commentsName=req.query.comments;
	 }
	 if (req.query && req.query.company!='') {
	 	companyName=req.query.company;
	 }
	// Create an empty Word object:Author=xyz&company=ABC&Comments
	//let docx = officegen('docx')
	 var docx = officegen({
	  'type': 'docx',
	  'Auther': authorName,
	  'Company': companyName,
	  'description': commentsName,
	  "creator":authorName
	});
	// Officegen calling this function after finishing to generate the docx document:
	docx.on('finalize', function(written) {
	  console.log(
	    'Finish to create a Microsoft Word document.'
	  )
	})
 
// Officegen calling this function to report errors:
docx.on('error', function(err) {
  console.log(err)
})
 
// Create a new paragraph:
let pObj = docx.createP()
 
pObj.addText('Simple')
pObj.addText(' with color', { color: '000088' })
pObj.addText(' and back color.', { color: '00ffff', back: '000088' })
 
pObj = docx.createP()
 
pObj.addText('Since ')
pObj.addText('officegen 0.2.12', {
  back: '00ffff',
  shdType: 'pct12',
  shdColor: 'ff0000'
}) // Use pattern in the background.
pObj.addText('you can do ')
pObj.addText('more cool ', { highlight: true }) // Highlight!
pObj.addText('stuff!', { highlight: 'darkGreen' }) // Different highlight color.
 
pObj = docx.createP()
 



 
pObj.addText('Those two lines are in the same paragraph,')
pObj.addLineBreak()
pObj.addText('but they are separated by a line break.')
 
docx.putPageBreak()
 
pObj = docx.createP()
 
pObj.addText('Fonts face only.', { font_face: 'Arial' })
pObj.addText(' Fonts face and size.', { font_face: 'Arial', font_size: 40 })
 
docx.putPageBreak()
 
pObj = docx.createP()
 
// We can even add images:
//pObj.addImage('some-image.png')
 
// Let's generate the Word document into a file:
 
let out = fs.createWriteStream('example.docx')
 
out.on('error', function(err) {
  console.log(err)
})
 
// Async call to generate the output file:
docx.generate(out)
//response.pipe(out);
var file = 'example.docx';
  console.log(file)

res.download(file);
 //res.end( "Hello" );


})
app.get('/', async function (req, res) {
	const template = fs.readFileSync('demo.docx');



 const data = {
  project: {
    name: 'docx-templates',
    details: { year: '2016' },
    people: [{ name: 'John', since: 2015 }, { name: 'Robert', since: 2010 }],
  },
};
try {
const buffer =await createReport({
  template,
  data:data,
    errorHandler: (err, command_code) => {
    	 console.log("err",err,command_code)
      return 'command failed!';
    },
});
fs.writeFileSync('report.docx', buffer)
 res.end( "Hello" );
  } catch (errors) {
  if (Array.isArray(errors)) {
    // An array of errors likely caused by bad commands in the template.
    console.log(errors);
  } else {
    // Not an array of template errors, indicating something more serious.
      console.log(errors);
    throw errors;
  }
}
     
  
})

var server = app.listen(9002, function () {
   var host = '3.139.44.162';//server.address().address;//"localhost";//
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
/*
const template = fs.readFileSync('demo.docx');
 
const buffer = await createReport({
  template,
  data: {
    name: 'John',
    surname: 'Appleseed',
  },
});
 
fs.writeFileSync('report.docx', buffer)
*/
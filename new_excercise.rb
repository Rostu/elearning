

#test for arguments
if ARGV.size == 0 || ARGV.size > 2 || ARGV.size == 1 
	puts "-h	-->	displays this help"
	puts "-n	-->	name for the new excersise"
end

if ARGV.size == 2 && ARGV[0] == "-n"

	$filename = ARGV[1]
		
	jsText = "$(document).ready(function() {
    \t$('#info1').show();
    \t$('#info1').append(\"<a id='infolink1' class='redlink' href='#'>Das ist ein Info-Link</a>\");
	//Here you can use your magic javascript skills
	}"
	#not used at the moment
	cssText = ""
	
	jadeText= "extends layout
block content
	#content_background
		link(rel='stylesheet', href='stylesheets/"+$filename+".css')
		script( src='javascripts/"+$filename+".js')
		#Aufgabenbox
			p Hier kommt der Aufgabentext hin
		#wrapper" 
	
	Dir.chdir "public/javascripts"	
	File.open($filename +".js", 'w') do |file|
        file.puts(jsText)
    end
	puts "changed to directory public/javascripts and created .js file"

	Dir.chdir "../stylesheets"
	File.open($filename +".css", 'w') do |file|
        file.puts(cssText)
    end
	puts "changed to directory public/stylesheets and created .css file"
	
	Dir.chdir "../"
	Dir.chdir "../views"
		File.open($filename +".jade", 'w') do |file|
        file.puts(jadeText)
    end
	puts "changed to directory views and created .jade file"      
end
	
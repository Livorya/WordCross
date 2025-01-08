using WordCross;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Serve static files from wwwroot
app.UseDefaultFiles(); // Serving index.html as the default file
app.UseStaticFiles(); // Serves other static files like CSS, JS, images, etc.


app.Run();
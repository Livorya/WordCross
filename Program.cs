using WordCross;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Use Swagger during development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Serve static files from wwwroot
app.UseDefaultFiles(); // Serving index.html as the default file
app.UseStaticFiles(); // Serves other static files like CSS, JS, images, etc.

// Methods for processing routes from Actions class
Actions actions = new(app);

app.Run();
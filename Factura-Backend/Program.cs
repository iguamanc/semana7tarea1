

using Factura_Backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var conexion = builder.Configuration.GetConnectionString("cn");
builder.Services.AddDbContext<DatosDBContext>(
    op => op.UseMySql(conexion, ServerVersion.Parse("10.4.32-MariaDB"))
    );
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(op => {
    op.AddPolicy("facturacion", credenciales =>
    {
        //credenciales.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        credenciales.WithOrigins("http://localhost:4200") // Especifica los orígenes permitidos
                  .AllowAnyHeader()
                  .AllowAnyMethod();
    });
});
var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("facturacion");      /////////////////////////
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

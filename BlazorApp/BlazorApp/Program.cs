using BlazorApp.Client.Pages;
using BlazorApp.Components;
using Microsoft.EntityFrameworkCore;
using BlazorApp;
using BlazorApp.Models;
using BlazorApp.Client.Models;
using BlazorApp.Client.Services;
using BlazorApp.Services;
using Microsoft.AspNetCore.Hosting;
using BlazorApp.Client;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents()
    .AddInteractiveWebAssemblyComponents();

// Add HttpClient for making external web API calls to the Backend server API
builder.Services.AddHttpClient();

// For prerendering purposes, register a named HttpClient for the app's
// named client component example.
builder.Services.AddHttpClient("WebAPI", client =>
    client.BaseAddress = new Uri(builder.Configuration["BackendUrl"] ?? "https://localhost:5001"));

// Add Todo service for components adopting SSR
builder.Services.AddScoped<ICaseService, ServerCaseService>();

// Add the database (in memory for the sample)
builder.Services.AddDbContext<CaseContext>(opt => opt.UseInMemoryDatabase("TodoList"));

// Add a CORS policy for the client
// Add .AllowCredentials() for apps that use an Identity Provider for authn/z
builder.Services.AddCors(
    options => options.AddPolicy(
        "server",
        policy => policy.WithOrigins(builder.Configuration["FrontendUrl"] ?? "https://localhost:5002")
            .AllowAnyMethod()
            .AllowAnyHeader()));

// Add services to the container
builder.Services.AddEndpointsApiExplorer();

// Add NSwag services
builder.Services.AddOpenApiDocument();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();

    // Seed the database
    await using var scope = app.Services.CreateAsyncScope();
    await SeedData.InitializeAsync(scope.ServiceProvider);

    // Add OpenAPI/Swagger generator and the Swagger UI
    app.UseOpenApi();
    app.UseSwaggerUi();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// Activate the CORS policy
app.UseCors("server");

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseAntiforgery();

// Set up API endpoints and methods
var todoItems = app.MapGroup("/cases");

todoItems.MapGet("/", GetAllCases);
todoItems.MapGet("/active", GetActiveCases);
todoItems.MapGet("/{id}", GetCase);
todoItems.MapPost("/", CreateCase);
todoItems.MapPut("/{id}", UpdateCase);
todoItems.MapDelete("/{id}", DeleteCase);

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode()
    .AddInteractiveWebAssemblyRenderMode()
    .AddAdditionalAssemblies(typeof(BlazorApp.Client._Imports).Assembly);

app.Run();

static async Task<IResult> GetAllCases(CaseContext db)
{
    return TypedResults.Ok(await db.Cases.ToArrayAsync());
}

static async Task<IResult> GetActiveCases(CaseContext db)
{
    return TypedResults.Ok(await db.Cases.Where(t => t.IsActive).ToListAsync());
}

static async Task<IResult> GetCase(String id, CaseContext db)
{
    return await db.Cases.FindAsync(id) is Case _case ? TypedResults.Ok(_case) : TypedResults.NotFound();
}

static async Task<IResult> CreateCase(Case _case, CaseContext db)
{
    db.Cases.Add(_case);
    await db.SaveChangesAsync();

    return TypedResults.Created($"/cases/{_case.Id}", _case);
}

static async Task<IResult> UpdateCase(String id, Case inputCase, CaseContext db)
{
    var _case = await db.Cases.FindAsync(id);

    if (_case is null)
    {
        return TypedResults.NotFound();
    }

    _case.Name = inputCase.Name;
    _case.IsActive = inputCase.IsActive;

    await db.SaveChangesAsync();

    return TypedResults.NoContent();
}

static async Task<IResult> DeleteCase(String id, CaseContext db)
{
    if (await db.Cases.FindAsync(id) is Case _case)
    {
        db.Cases.Remove(_case);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    return TypedResults.NotFound();
}

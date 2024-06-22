using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using BlazorApp.Client;
using BlazorApp.Client.Services;


var builder = WebAssemblyHostBuilder.CreateDefault(args);

// Add Todo service for components adopting CSR
builder.Services.AddScoped<ICaseService, ClientCaseService>();

// Create a preconfigured HttpClient with base address for the Case (web) API
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.Configuration["FrontendUrl"] ?? "https://localhost:5002") });

// Create a preconfigured named HttpClient with base address for named client component example
builder.Services.AddHttpClient("WebAPI", client => client.BaseAddress = new Uri(builder.Configuration["BackendUrl"] ?? "https://localhost:5002"));

await builder.Build().RunAsync();

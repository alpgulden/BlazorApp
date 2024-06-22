using BlazorApp.Client.Models;
using System.Net.Http.Json;

namespace BlazorApp.Client.Services;

public class ClientCaseService(HttpClient http) : ICaseService
{
    public async Task<Case[]> GetCasesAsync(bool activeCases)
    {
        var requestUri = activeCases ? $"cases/active" : "cases";
        return await http.GetFromJsonAsync<Case[]>(requestUri) ?? [];
    }

    public async Task PostCaseAsync(Case _case)
    {
        await http.PostAsJsonAsync("cases", _case);
    }

    public async Task PutCaseAsync(String id, Case _case)
    {
        await http.PutAsJsonAsync($"cases/{id}", _case);
    }

    public async Task DeleteCaseAsync(String id)
    {
        await http.DeleteAsync($"cases/{id}");
    }
}

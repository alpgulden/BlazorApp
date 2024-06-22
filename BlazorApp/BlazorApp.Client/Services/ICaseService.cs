using BlazorApp.Client.Models;

namespace BlazorApp.Client.Services;

public interface ICaseService
{
    public Task<Case[]> GetCasesAsync(bool activeCases);

    public Task PostCaseAsync(Case _case);

    public Task PutCaseAsync(String id, Case _case);

    public Task DeleteCaseAsync(String id);
}

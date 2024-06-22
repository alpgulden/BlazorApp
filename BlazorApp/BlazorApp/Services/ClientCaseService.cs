using BlazorApp.Client.Models;
using BlazorApp.Client.Services;
using BlazorApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BlazorApp.Services;

public class ServerCaseService(CaseContext db) : ICaseService
{
    public async Task<Case[]> GetCasesAsync(bool activeCases)
    {
        return activeCases ? 
            await db.Cases.Where(t => t.IsActive).ToArrayAsync() : 
            await db.Cases.ToArrayAsync();
    }

    public async Task PostCaseAsync(Case _case)
    {
        db.Cases.Add(_case);
        await db.SaveChangesAsync();
    }

    public async Task PutCaseAsync(String id, Case inputCase)
    {
        var _case = await db.Cases.FindAsync(id);

        if (_case is null)
        {
            return;
        }

        _case.Name = inputCase.Name;
        _case.IsActive = inputCase.IsActive;

        await db.SaveChangesAsync();
    }

    public async Task DeleteCaseAsync(String id)
    {
        if (await db.Cases.FindAsync(id) is Case _case)
        {
            db.Cases.Remove(_case);
            await db.SaveChangesAsync();
        }
    }
}

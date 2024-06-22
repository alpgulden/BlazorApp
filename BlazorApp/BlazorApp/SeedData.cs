using Microsoft.EntityFrameworkCore;
using BlazorApp.Models;
using BlazorApp.Client.Models;

namespace BlazorApp;

public class SeedData
{
    public static async Task InitializeAsync(IServiceProvider serviceProvider)
    {
        using var context = new CaseContext(serviceProvider.GetRequiredService<DbContextOptions<CaseContext>>());

        context.Add(new Case { Id= "23-24603", Name = "zzUAT New Case 240603", Date= DateTime.Parse("02/28/2024"), Court= "Western District of North Carolina, Charlotte Division", IsActive = true });
        context.Add(new Case { Id = "24-11840", Name = "Thrasio Holdings, Inc., et al.", Date = DateTime.Parse("02/28/2024"), Court = "District of New Jersey", IsActive = false });
        context.Add(new Case { Id = "24-11362", Name = "Invitae Corporation, et al.", Date= DateTime.Parse("03/15/2024"), Court = "District of New Jersey", IsActive = true });
        context.Add(new Case { Id = "24-10164", Name = "Cano Health, Inc., et al.", Date = DateTime.Parse("02/04/2024"), Court= "District of Delaware", IsActive = true });
      
        await context.SaveChangesAsync();
    }
}

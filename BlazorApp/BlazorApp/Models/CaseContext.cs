using Microsoft.EntityFrameworkCore;
using BlazorApp.Client.Models;

namespace BlazorApp.Models;

public class CaseContext : DbContext
{
    public CaseContext(DbContextOptions<CaseContext> options) : base(options)
    {
    }

    public DbSet<Case> Cases { get; set; } = null!;
}

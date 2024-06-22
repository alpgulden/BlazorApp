using System.Data;
using Microsoft.VisualBasic;

namespace BlazorApp.Client.Models;

public sealed class Case
{
    public string Id { get; set; }
    public string? Name { get; set; }

    public DateTime? Date { get; set; }
    public string? Court { get; set; }

    public bool IsActive { get; set; }
}

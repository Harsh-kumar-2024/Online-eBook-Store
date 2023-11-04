using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Models;

namespace OnlineBookStoreAPI.Database
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<BookModel> Books { get; set; }
        public DbSet<AdminModel> Admins { get; set; }
    }
}

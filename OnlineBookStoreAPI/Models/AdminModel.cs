using System.ComponentModel.DataAnnotations;

namespace OnlineBookStoreAPI.Models
{
    public class AdminModel
    {
        [Key]
        public int AdminId { get; set; }
        [Required]
        public string AdminEmail { get; set; } = string.Empty;
        [Required]
        public string AdminPassword { get; set; } = string.Empty;
    }
}

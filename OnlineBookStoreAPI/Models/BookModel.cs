using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineBookStoreAPI.Models
{
    public class BookModel
    {
        [Key]
        public int BookID { get; set; }
        [Required]

        public string BookName { get; set; } = string.Empty;
        [Required]
        public string BookAuthorName { get; set; } = string.Empty;
        [Required]
        public string BookDescription { get; set; } = string.Empty;
        [Required]
        public string BookDownloadLink { get; set; } = string.Empty;
        [Required]
        public string UploaderEmail { get; set; } = string.Empty;
        [Required]
        public string UploaderName { get; set; } = string.Empty;
        [Required]
        public string UploaderPassword { get; set; } = string.Empty;
        [Required]
        public bool IsVerify { get; set; } = false;
    }
}

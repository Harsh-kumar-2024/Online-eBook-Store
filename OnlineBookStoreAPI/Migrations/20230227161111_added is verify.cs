using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineBookStoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class addedisverify : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsVerify",
                table: "Books",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsVerify",
                table: "Books");
        }
    }
}

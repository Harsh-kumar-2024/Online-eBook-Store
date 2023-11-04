using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineBookStoreAPI.Database;
using OnlineBookStoreAPI.Models;

namespace OnlineBookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminModelsController : ControllerBase
    {
        private readonly DataContext _context;

        public AdminModelsController(DataContext context)
        {
            _context = context;
        }


        // POST: api/AdminModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AdminModel>> PostAdminModel(AdminModel adminModel)
        {
            var adminDataFrom = await _context.Admins.FindAsync(adminModel.AdminId);
            if(adminDataFrom == null) { return BadRequest("Not found"); }
            else
            {
                if(adminDataFrom.AdminPassword == adminModel.AdminPassword)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            //_context.Admins.Add(adminModel);
            //await _context.SaveChangesAsync();

            //return CreatedAtAction("GetAdminModel", new { id = adminModel.AdminId }, adminModel);
            //return Created("GetAdminModel", adminModel);
        }

        //private bool AdminModelExists(int id)
        //{
        //    return _context.Admins.Any(e => e.AdminId == id);
        //}
    }
}

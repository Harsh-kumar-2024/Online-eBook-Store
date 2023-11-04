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
    public class BookModelsController : ControllerBase
    {
        private readonly DataContext _context;

        public BookModelsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/BookModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookModel>>> GetBooks()
        {
            return await _context.Books.ToListAsync();
        }

        // GET: api/BookModels/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<BookModel>> GetBookModel(int id)
        //{
        //   var bookModel = await _context.Books.FindAsync(id);
        //
        //    if (bookModel == null)
        //    {
        //        return NotFound();
        //   }
        //
        //    return bookModel;
        //}

        // PUT: api/BookModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookModel(int id, BookModel bookModel)
        {
            if (id != bookModel.BookID)
            {
                return BadRequest();
            }

            bool ans = await IsUserAsync(id, bookModel);
            if (ans)
            {
                _context.Entry(bookModel).State = EntityState.Deleted;
               

                try
                {
                    _context.Set<BookModel>().Update(bookModel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BookModelExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            else
            {
                return Unauthorized();
            }

            return Ok();
        }
        [HttpPut("admin/{id}")]
        public async Task<IActionResult> PutBookModelStatus(int id, BookModel bookModel)
        {
            if (id != bookModel.BookID)
            {
                return BadRequest();
            }

            try
            {
                _context.Set<BookModel>().Update(bookModel);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok();
        }

        // POST: api/BookModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookModel>> PostBookModel(BookModel bookModel)
        {
            _context.Books.Add(bookModel);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetBookModel", new { id = bookModel.BookID }, bookModel);
            return Created("GetBookModel", bookModel);
        }

        // DELETE: api/BookModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookModel(int id, BookModel bookModel)
        {
            if (id != bookModel.BookID)
            {
                return BadRequest();
            }
            bool ans = await IsUserAsync(id,bookModel);
            _context.Entry(bookModel).State = EntityState.Deleted;
            if (ans)
            {
                _context.Set<BookModel>().Attach(bookModel);
                _context.Set<BookModel>().Remove(bookModel);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                return Unauthorized();
            }

            
        }

        private bool BookModelExists(int id)
        {
            return _context.Books.Any(e => e.BookID == id);
        }
        private async Task<bool> IsUserAsync(int id, BookModel bookModel)
        {
            var bookModelFromData = await _context.Books.FindAsync(id);
            if (bookModelFromData != null)
            {
                if (bookModelFromData.UploaderEmail != bookModel.UploaderEmail)
                { 
                    return false;
                }
                else
                {
                    if (bookModelFromData.UploaderPassword == bookModel.UploaderPassword)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            else
            {
                return false;
            }
        }
    }
}

using ElbilHusvagnLadda.WebApi.Data;
using ElbilHusvagnLadda.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ElbilHusvagnLadda.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChargingPointsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<ChargingPointsController> _logger;

    public ChargingPointsController(AppDbContext context, ILogger<ChargingPointsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ChargingPoint>>> GetChargingPoints()
    {
        try
        {
            var chargingPoints = await _context.ChargingPoints.ToListAsync();
            return Ok(chargingPoints);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving charging points");
            return StatusCode(500, "An error occurred while retrieving charging points");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ChargingPoint>> GetChargingPoint(int id)
    {
        try
        {
            var chargingPoint = await _context.ChargingPoints.FindAsync(id);

            if (chargingPoint == null)
            {
                return NotFound();
            }

            return Ok(chargingPoint);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving charging point {Id}", id);
            return StatusCode(500, "An error occurred while retrieving the charging point");
        }
    }

    [HttpPut("{id}")]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public async Task<IActionResult> UpdateChargingPoint(int id, ChargingPoint chargingPoint)
    {
        if (id != chargingPoint.Id)
        {
            return BadRequest();
        }

        _context.Entry(chargingPoint).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ChargingPointExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpPost]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public async Task<ActionResult<ChargingPoint>> CreateChargingPoint(ChargingPoint chargingPoint)
    {
        _context.ChargingPoints.Add(chargingPoint);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetChargingPoint", new { id = chargingPoint.Id }, chargingPoint);
    }

    private bool ChargingPointExists(int id)
    {
        return _context.ChargingPoints.Any(e => e.Id == id);
    }
}

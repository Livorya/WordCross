namespace WordCross;
using Npgsql;

public class Actions
{
    private Database _database = new();
    private NpgsqlDataSource _db;

    public Actions(WebApplication app)
    {
        _db = _database.Connection();
        
        // Map incoming TestWord GET route from client to method
        // http://localhost:5185/test-word/Smurfa
        app.MapGet("/test-word/{word}", TestWord);
        
        // Map incoming NewWord POST route from client to method
        // http://localhost:5185/new-word
        app.MapPost("/new-word", async (HttpContext context) =>
        {
            // WordRequest here, is a class that defines the post requestBody format
            var requestBody = await context.Request.ReadFromJsonAsync<string>();
            if (requestBody is null)
            {
                return Results.BadRequest("Word is required.");
            }
            bool success = await NewWord(requestBody, context.Request.Cookies["ClientId"]);
            return success ? Results.Ok("Word added successfully.") : Results.StatusCode(500);
        });
    }
    
    // Read a word from the word table in the database
    public async Task<string> GetWord(string subjectId)
    {
        var query = @"SELECT name
                      FROM word
                      WHERE subject_id = $1
                      LIMIT 1";

        await using (var cmd = _db.CreateCommand(query))
        {
            cmd.Parameters.AddWithValue(subjectId);

            await using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    return reader.GetString(1);
                }
            }
        }

        return "";
    }
    
    // Process incoming TestWord from client
    async Task<bool> TestWord(string word)
    {
        await using var cmd = _db.CreateCommand("SELECT EXISTS (SELECT 1 FROM words WHERE word = $1)"); // fast if word exists in table query 
        cmd.Parameters.AddWithValue(word);
        bool result = (bool)(await cmd.ExecuteScalarAsync() ?? false); // Execute fast if word exists in table query 
        return result;
    }

    // Process incoming NewWord  from client
    async Task<bool> NewWord(string word, string clientId)
    {
        await using var cmd = _db.CreateCommand("INSERT INTO words (word, clientid) VALUES ($1, $2)");
        cmd.Parameters.AddWithValue(word);
        cmd.Parameters.AddWithValue(clientId);
        int rowsAffected = await cmd.ExecuteNonQueryAsync(); // Returns the number of rows affected
        return rowsAffected > 0; // Return true if the insert was successful
    }
}
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
        app.MapGet("/random-words-with-hints/{subjectId}", GetRandomWordsWithHints);
    }

    // Returns 6 random words with their hints for a given subject
    async Task<List<string>> GetRandomWordsWithHints(int subjectId)
    {
        var query = @"SELECT name, hint 
                  FROM word 
                  WHERE subject_id = $1 
                  ORDER BY RANDOM() 
                  LIMIT 6";

        List<string> wordHintPairs = new();
        await using (var cmd = _db.CreateCommand(query))
        {
            cmd.Parameters.AddWithValue(subjectId);
            await using (var reader = await cmd.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    var word = reader.GetString(0); // Get word
                    var hint = reader.GetString(1); // Get hint
                    wordHintPairs.Add(word + ";" + hint); // Add word-hint pair to list
                }
            }
        }
        return wordHintPairs;
    }

}


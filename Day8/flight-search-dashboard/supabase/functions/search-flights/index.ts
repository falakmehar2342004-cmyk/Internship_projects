
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Read the private SerpAPI key from Supabase secrets.
    const apiKey = Deno.env.get("SERPAPI_KEY");

    if (!apiKey) {
      throw new Error("SERPAPI_KEY is missing from Supabase secrets.");
    }

    // Receive search details from the React frontend.
const {
  departure,
  destination,
  outboundDate,
  returnDate,
  tripType = "one-way",
  adults = 1,
} = await req.json();

const arrival = destination;
    if (!departure || !arrival || !outboundDate) {
      return Response.json(
        { error: "Departure, arrival and outbound date are required." },
        { status: 400, headers: corsHeaders },
      );
    }

    // Prepare the Google Flights request.
    const params = new URLSearchParams({
      engine: "google_flights",
      departure_id: departure,
      arrival_id: arrival,
      outbound_date: outboundDate,
      adults: String(adults),
      currency: "PKR",
      hl: "en",
      api_key: apiKey,
      type: tripType === "round-trip" ? "1" : "2",
    });

    if (tripType === "round-trip" && returnDate) {
      params.set("return_date", returnDate);
    }

    // Fetch flight results from SerpAPI.
    const response = await fetch(
      `https://serpapi.com/search.json?${params.toString()}`,
    );

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || "SerpAPI request failed.");
    }

    // Convert provider results into the format used by React.
    const flights = [
      ...(data.best_flights ?? []),
      ...(data.other_flights ?? []),
    ].map((flight: any, index: number) => {
      const segments = flight.flights ?? [];
      const first = segments[0];
      const last = segments[segments.length - 1];

      return {
        id: `${index}-${first?.flight_number ?? "flight"}`,
        airline: first?.airline ?? "Unknown airline",
        airlineLogo: first?.airline_logo ?? "",
        departureAirport: first?.departure_airport?.id ?? departure,
        arrivalAirport: last?.arrival_airport?.id ?? arrival,
        departureTime: first?.departure_airport?.time ?? "",
        arrivalTime: last?.arrival_airport?.time ?? "",
        duration: flight.total_duration ?? 0,
        stops: Math.max(segments.length - 1, 0),
        price: flight.price ?? 0,
        segments,
      };
    });

    return Response.json({ flights }, { headers: corsHeaders });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to search flights.";

    console.error("Flight search error:", message);

    return Response.json(
      { error: message },
      { status: 500, headers: corsHeaders },
    );
  }
});

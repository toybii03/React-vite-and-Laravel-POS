<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function sales()
    {
        // Example: return total sales
        return \App\Models\Payment::sum('final_amount');
    }
}

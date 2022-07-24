<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Http\Resources\CompanyResource;
use App\Models\Company;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CompaniesController extends Controller
{
    public function index(Request $request)
    {
        $company = Company::orderByDesc('id');

        if($status = $request->get('status')){
            $company->where('status', $status);
        }

        return CompanyResource::collection($company->paginate());
    }

    public function store(CompanyRequest $request)
    {
        $company = Company::create($request->only('name', 'status', 'address' ) + [
                'defined_created_at' => $request->get('created_at')
            ]
        );

        return response(
            new CompanyResource($company),
            Response::HTTP_CREATED);
    }

    public function show($id)
    {
        return new CompanyResource(Company::find($id));
    }

    public function update(CompanyRequest $request, $id)
    {
        $company = Company::find($id);

        $company->update($request->only('name', 'status', 'address' ) + [
                'defined_created_at' => $request->get('created_at')
            ]);

        return \response(
            new CompanyResource($company),
            Response::HTTP_ACCEPTED);
    }
}

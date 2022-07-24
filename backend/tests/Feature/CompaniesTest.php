<?php

namespace Tests\Feature;

use App\Enums\CompanyStatus;
use App\Models\Company;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class CompaniesTest extends TestCase
{
    public function test_index()
    {
        $date = new \DateTime();

        $company = Company::create([
            'name' => 'foo',
            'status' => CompanyStatus::CUSTOMER->value,
            'address' => 'bar',
            'defined_created_at' => $date->format('y-m-d H:i:s')
        ]);

        $response = $this->get(route('companies.index'));

        $response->assertStatus(Response::HTTP_OK);
        $response = $response->json();
        $this->assertTrue(count($response['data']) > 0);

        $company->delete();
    }
    public function test_index_filter()
    {
        $date = new \DateTime();

        $status = CompanyStatus::DEAD->value;

        $company = Company::create([
            'name' => 'foo',
            'status' => $status,
            'address' => 'bar',
            'defined_created_at' => $date->format('y-m-d H:i:s')
        ]);

        $response = $this->get(route('companies.index').'?status='.$status);

        $response->assertStatus(Response::HTTP_OK);
        $response = $response->json();
        $this->assertEquals(Company::where('status',$status)->count(), $response['meta']['total']);

        $company->delete();
    }

    public function test_store()
    {
        $date = new \DateTime();

        $data = [
            'name' => 'foo',
            'status' => CompanyStatus::CUSTOMER->value,
            'address' => 'bar',
            'created_at' => $date->format('y-m-d H:i:s')
        ];

        $response = $this->post(route('companies.store'), $data);

        $response->assertStatus(Response::HTTP_CREATED);

        $response = $response->json();

        Company::where('id', $response['id'])->delete();

        $this->assertTrue(isset($response['id']));
        unset($response['id']);

        $this->assertEquals($data, $response);

    }

    public function test_show()
    {
        $date = new \DateTime();

        $data = [
            'name' => 'foo',
            'status' => CompanyStatus::CUSTOMER->value,
            'address' => 'bar',
            'defined_created_at' => $date->format('y-m-d H:i:s')
        ];

        $company = Company::create($data);

        $response = $this->get(route('companies.show', ['company' => $company->id]));

        $response->assertStatus(Response::HTTP_OK);

        $response = $response->json();

        $company->delete();

        $this->assertTrue(isset($response['id']));
        unset($response['id']);
        $data['created_at'] = $data['defined_created_at'];
        unset($data['defined_created_at']);

        $this->assertEquals($data, $response);
    }

    public function test_update()
    {
        $date = new \DateTime();

        $data = [
            'name' => 'foo',
            'status' => CompanyStatus::CUSTOMER->value,
            'address' => 'bar',
            'created_at' => $date->format('y-m-d H:i:s')
        ];

        $company = Company::create([
            'name' => 'foo2',
            'status' => CompanyStatus::DEAD->value,
            'address' => 'bar2',
            'defined_created_at' => $date->modify('+1 day')->format('y-m-d H:i:s')
        ]);

        $response = $this->put(route('companies.update', ['company' => $company->id]), $data);

        $response->assertStatus(Response::HTTP_ACCEPTED);

        $response = $response->json();

        $company->delete();

        $this->assertTrue(isset($response['id']));
        unset($response['id']);

        $this->assertEquals($data, $response);
    }
}

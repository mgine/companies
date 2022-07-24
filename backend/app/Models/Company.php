<?php

namespace App\Models;

use App\Enums\CompanyStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Company
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Company newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Company newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Company query()
 * @mixin \Eloquent
 */
class Company extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'status' => CompanyStatus::class
    ];

    public function setDefinedCreatedAtAttribute($value){
        $this->attributes['defined_created_at'] = '20'.$value;
    }

    public function getDefinedCreatedAtAttribute($value){
        return substr($value, 2);
    }
}

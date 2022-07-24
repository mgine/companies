<?php

namespace App\Enums;

enum CompanyStatus:string
{
    case TRIAL = 'Trial';
    case CUSTOMER = 'Customer';
    case DEAD = 'Dead';
}

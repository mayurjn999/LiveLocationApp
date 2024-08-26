package com.liveLocationBackend.liveLocationBackend.Controller;

import com.liveLocationBackend.liveLocationBackend.model.Location;
import com.liveLocationBackend.liveLocationBackend.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/location")
//@CrossOrigin(origins = "http://localhost:*")
public class LocationController {

    @Autowired
    private LocationService service;

    @PostMapping("/send")
    public String sendLocation(@RequestBody Location location) throws InterruptedException {
//        for(int i = 0; i < 1000001; i++) {
//            TimeUnit.SECONDS.sleep(1);
//            Location x = new Location();
//            x.setLatitude(location.getLatitude() + i * .000100);
//            x.setLongitude(location.getLongitude() + i * .000100);
//            service.publishLocation(x);
//        }
        service.publishLocation(location);
        return "Location sent successfully!";
    }
}


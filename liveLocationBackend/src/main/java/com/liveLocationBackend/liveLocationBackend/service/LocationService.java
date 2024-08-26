package com.liveLocationBackend.liveLocationBackend.service;


import com.liveLocationBackend.liveLocationBackend.config.AppConstants;
import com.liveLocationBackend.liveLocationBackend.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class LocationService {


    @Autowired
    private KafkaTemplate<String, Location> kafkaTemplate;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    public boolean publishLocation(Location location) {
        try {
            kafkaTemplate.send(AppConstants.TOPIC_NAME, location);
            return true;
        }catch (Exception e)
        {
            e.printStackTrace();
        }
        return false;
    }


    @KafkaListener(topics = AppConstants.TOPIC_NAME, groupId = "group_id")
    public void consumeLocation(Location location) {
        messagingTemplate.convertAndSend("/topic/locations", location);
        System.out.println("Sent location to WebSocket: " + location.getLatitude() + ", " + location.getLongitude());
    }
}

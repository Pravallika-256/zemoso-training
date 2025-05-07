import heapq

bus_network = {
    'A': [('B', 3), ('C', 4)],
    'B': [('D', 2)],
    'C': [('D', 3)],
    'D': []
}
def find_shortest_path(network, source, destination):
    queue = [(0, source, [source])] 
    visited = set()

    while queue:
        current_cost, current_stop, path = heapq.heappop(queue)

        if current_stop == destination:
            return path, current_cost

        visited.add(current_stop)

        for neighbor, cost in network.get(current_stop, []):
            if neighbor not in visited:
                total_cost = current_cost + cost
                heapq.heappush(queue, (total_cost, neighbor, path + [neighbor]))

    return None, float('inf')

source = input("Enter source stop: ")
destination = input("Enter destination stop: ")

route, total_cost = find_shortest_path(bus_network, source, destination)

if route:
    print(f"Best route: {' → '.join(route)}")
    print(f"Total cost: {total_cost}")
else:
    print("No route found!")

 
